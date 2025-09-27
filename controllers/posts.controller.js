let posts=[]

let createPost=(req,res)=>{
    let {title,content,category,tags}=req.body
    if(!title || !content || !category || !tags){
        return res.status(400).json({message: `Nimadirda xato qildingiz`})

    }
    let newId=posts.length>0 ? posts[posts.length-1].id+1:1
    let now=new Date().toISOString()

    let newPost={
        id:newId,
        title,
        content,
        category,
        tags,
        createdAt:now,
        updatedAt:now
    }
    posts.push(newPost)
    res.status(201).json(newPost)
}

let getOnePost=(req,res)=>{
    let {id}=req.params
    
    let postIndex=posts.findIndex((post)=>post.id=== Number(id))
    if(postIndex === -1){
        return res.status(404).send({message:`#${id} bunday post mavjud emas`})
    }
    let post=posts[postIndex]
    res.status(200).json(post)
}

let getAllPosts = (req, res) => {
    let { term, page, limit } = req.query;

    page = Number(page) || 1;   
    limit = Number(limit) || 10;

    let result = posts;

    if (term) {
        const lower = term.toLowerCase();
        result = result.filter(p => {
            const tagsString = Array.isArray(p.tags) ? p.tags.join(",") : p.tags || "";
            return (
                (p.title && p.title.toLowerCase().includes(lower)) ||
                (p.category && p.category.toLowerCase().includes(lower)) ||
                (p.content && p.content.toLowerCase().includes(lower)) ||
                tagsString.toLowerCase().includes(lower)
            );
        });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = result.slice(startIndex, endIndex);

    res.status(200).json({
        total: result.length,
        page,
        limit,
        data: paginatedPosts
    });
};


let updatePost=(req,res)=>{
    let {id}=req.params
    let foundedPost=posts.find((p)=>p.id===+id)
    if(!foundedPost){
        return res.status(404).send({
            message: `#${foundedPost} topilmadi`
        })
    }
    Object.assign(foundedPost,req.body)
    res.status(200).json({message: "Successfully updated"})
}

let deletePost=(req,res)=>{
    let {id}=req.params
    let foundedPost=posts.find((post)=>post.id===+id)
    if(!foundedPost){
        return res.status(404).send({message: `#${foundedPost} bunday post mavjud emas`})
    }
    posts=posts.filter((post)=>post.id !==+id)
    res.status(200).json({message:"Gap yoq delete qildiz"})
}

export {createPost,getAllPosts,getOnePost,updatePost,deletePost}