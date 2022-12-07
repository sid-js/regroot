import clientPromise from "../../lib/mongodb";
import axios from "axios";

export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("regroot");
    
  let jobdata = [];
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f4fae9e143msh8977d993ed2cef8p1fb82cjsn847e1873c635",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };
  const {q} = req.query;
  await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${q}&num_pages=1`,
    options
  )
    .then((response) => response.json())
    .then(async (response) => {
      console.log(response);
      response.data.map((job) => {
        jobdata.push({
          employer_name: job.employer_name,
          employer_logo: job.employer_logo,
          job_publisher: job.job_publisher,
          job_title: job.job_title,
          job_apply_link: job.job_apply_link,
          job_description: job.job_description,
          job_country: job.job_country,
          job_city: job.job_city,
          job_qualifications: job.job_highlights.Qualifications,
          posted: job.job_posted_at_datetime_utc,
        });
        
      });
      try {
         db.collection("jobs").insertMany(jobdata);
      }
      catch(e) {
        console.log(e);
      }
      res.json(jobdata);
    })
    .catch((err) => console.error(err));
};
