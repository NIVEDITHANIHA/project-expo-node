const projects = require("../Modals/projectSchema");

exports.addProjects = async (req, res) => {
   const userId = req.payload
    console.log(userId);

    const project_img = req.file.filename
    console.log("project_img", project_img);
    const { project_title, language_used, github_link, website_link, project_overview } = req.body
    console.log("req.body", project_title, language_used, github_link, website_link, project_overview);

    try {
       const existingProjects = await projects.findOne({ github_link: github_link })

        if (existingProjects) {
            res.status(406).json("existing Github Link")

        } else {
            const newProjects = new projects({
                project_title: project_title,
                language_used: language_used,
                github_link: github_link,
                website_link: website_link,
                project_overview: project_overview,
                project_img: project_img,
                user_id: userId
            })

            await newProjects.save()
            res.status(200).json(newProjects)

        }
    }
    catch (err) {
        res.status(401).json(`requset  Failed due to ${err}`)

    }


}
/* To get all projects from get api */

exports.getAllProjects = async (req, res) => {
    /* for searching language we have use Get ALL projet Api  */
    const searchKey = req.query.search
    console.log(searchKey);
    /*  $options: "i" -> to remove case sensitive */
    const query = {
        language_used: {
            $regex: searchKey, $options: "i"
        }


    }

    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)

    }
    catch (err) {
        res.status(401).json(`requset  Failed due to ${err}`)

    }



}



/* To get only 3 projects from get api */

exports.getHomeProjects = async (req, res) => {

    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)

    }
    catch (err) {
        res.status(401).json(`requset  Failed due to ${err}`)

    }



}




/* get User Related Projects */

exports.userSpecificProjects = async (req, res) => {

   const userId = req.payload
    console.log(userId);
    try {
        const userProjects = await projects.find({ user_id: userId })
        res.status(200).json(userProjects)

    }
    catch (err) {
        res.status(401).json(`requset  Failed due to ${err}`)

    }



}

/* get Edit Projects */

exports.editUserProjects = async (req, res) => {

    const { id } = req.params;
    console.log(id);

    const userId = req.payload
    const { project_title, language_used, github_link, website_link, project_overview, project_img } = req.body
    console.log(req.body);
    const updatedProject_img = req.file ? req.file.filename : project_img

    console.log(updatedProject_img);

    try {
        const updateProjects = await projects.findByIdAndUpdate({ _id: id }, { project_title, language_used, github_link, website_link, project_overview, project_img: updatedProject_img, user_id: userId }, { new: true })
        await updateProjects.save();
        res.status(200).json(updateProjects)


    }
    catch (err) {
        res.status(401).json(err)

    }

}

/* delete Related Projects */


exports.deleteUserProjects = async (req, res) => {
    const { id } = req.params
    console.log("id", id);

    try {
        const deleteprojects = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteprojects)


    }
    catch (err) {

        res.status(401).json(err)
    }



}