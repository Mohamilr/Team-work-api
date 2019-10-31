import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import { image } from 'cloudinary/lib-es5/cloudinary';

// configure cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const gifController = {
    
     async postGif (req, res) {
        let image = req.files.gif;
        const { title, userId } = req.body;
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
                // if(err) {
                //     res.status(403).json({
                //         status: 'error',
                //         error: 'incorrect token'
                //     })
                // }

                
                cloudinary.v2.uploader.upload(image.tempFilePath, {resourse_type : 'gif'}, (err, result, imageUrl) => {
                    if(err) {
                        console.log(err)
                    }
                     imageUrl = result.url
                    return imageUrl
                })


                // const cloudinaryLink = cloudinary.v2.uploader.upload(image.tempFilePath, {resourse_type : 'gif'})
                // .then((res) =>  
                // res
                // // console.log(res)
                // ).catch((e) =>
                //     console.log(e) 
                // )
                // // console.log(data)
                // console.log(cloudinaryLink)

                // const gif = `INSERT INTO gifs (image, title, userId , createdOn)
            // VALUES($1, $2, $3, $4) RETURNING *`;
            // const values = [title, userId, new Date().toLocaleDateString()]


            })
   
        }
        catch (e) {
            console.log(e);
        }
        
    }

}

export default gifController;