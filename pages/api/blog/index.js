const Blog = (req, res) => {
    const a = process.env.DB_HOST
    console.log(a);
    res.statusCode = 200;
    res.json({ name: "John Doe" })
}

export default Blog;