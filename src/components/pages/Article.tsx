import { useLoaderData } from 'react-router-dom';
import * as React from 'react';

interface Article {
  service_id: string;
  title: string;
  a_text: string;
  attachment: string;
}

export async function loader({ params }) {
  console.log('loader');

  const serviceId = params.serviceId;
  const response = await fetch(`http://109.120.135.54:3005/course/2`, {
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

function Article() {
  const { data } = useLoaderData() as {
    data: Article;
    fullUrl: string;
  };
  console.log(data.a_text);

  const paragraphs = `${data.a_text}`.split('\n\n').map((text, index) => (
    <React.Fragment key={index}>
      {text}
      <br />
    </React.Fragment>
  ));

  return (
    <main className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-4">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p>{paragraphs}</p>
      <div className="flex justify-center">
        <a
          href={`http://109.120.135.54:3005/${data.attachment}`}
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Attachment
        </a>
      </div>
    </main>
  );
}

export default Article;
