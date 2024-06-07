import { useEffect, useState } from "react"

interface Course {
  level: string;
  name: string;
  price: string;
  service_id: string;
  user_id: string;
}

export default function Service() {
  
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the order parameters
        const queryParams = new URLSearchParams({
          'order[column]': 'price',
          'order[direction]': 'asc'
        }).toString();
        
        const url = `http://localhost:3005/allcourse?${queryParams}`;
        console.log("Constructed URL:", url);  // Check what URL is being constructed
        const response = await fetch(url);
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section id="Projects"
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {data.map((course, index) => (
          <div key={index} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
              <img src="/course.jpg"
                  alt={course.name} className="h-80 w-72 object-cover rounded-t-xl" />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">{course.level}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{course.name}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">${course.price}</p>
                  <div className="ml-auto">
                    {/* left elements */}
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
    </section>
  );
}