import { useLoaderData } from 'react-router-dom';

interface Video {
  service_id: string;
  title: string;
  v_time: number;
  v_description: string;
  video_address: string;
}

export async function loader({ params }) {
  console.log('loader');

  const serviceId = params.serviceId;
  const response = await fetch(`http://109.120.135.54:3005/course/1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      serviceId,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  console.log(data);

  return { data };
}

function Video() {
  const { data } = useLoaderData() as { data: Video };
  console.log(data);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-700 mb-8">{data.v_description}</p>
      <div className="flex justify-center mb-16">
        <video className="w-full max-w-md" controls>
          <source
            src={`http://109.120.135.54:3005/${data.video_address}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Video;
