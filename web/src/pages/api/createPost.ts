import { NextApiRequest, NextApiResponse } from "next";

import { env } from "../../env/server.mjs";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default async function createPost(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerAuthSession({ req, res });

    if (!session) {
        res.statusCode = 401;
        return(res.json({'Error': 'User not logged in.'}));
    }
    const query = req.query;

    if(!query.prompt){
        res.statusCode = 402;
        return(res.json("No prompt provided"));
    }
    // const settings = [
    //     {
    //         'prompt': query.prompt,
    //         'format': 'json',
    //         'guidance_scale': 7.5,
    //         'num_inference_steps': 50,
    //         'num_images': 1,
    //         'height': 512,
    //         'width': 512,
    //         'use_ldm': false,
    //     },
    // ];
    const url = env.DIFFUSION_URL + '/txt2img?prompt='+query.prompt+'&format=json';

	const data = await fetch(url,{
    headers: {
        'X-API-Key': env.X_API_KEY,
        'Accept': 'application/json',
        },
    });

    if(data.status == 406){
        res.statusCode = 403;
        return(res.json({'Error': 'NSFW CONTENT REJECTED.'}));
    }

    const resData = await data.json();

    return(res.json({'image': resData.image}));
}