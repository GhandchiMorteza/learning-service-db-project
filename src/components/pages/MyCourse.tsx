import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Course {
  level: string;
  name: string;
  price: string;
  service_id: string;
  user_id: string;
}

function MyCourse() {
  const navigate = useNavigate();
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem('userData');
        let userId;

        if (userString) {
          try {
            const user = JSON.parse(userString);
            userId = user.user_id;
            console.log(userId);
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            navigate('/login');
            return;
          }
        } else {
          console.warn('No user data found in local storage.');
          navigate('/login');
          return;
        }

        const response = await fetch('http://109.120.135.54:3005/mycourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: 25 }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        setData(data);
        setLoading(false);
      } catch (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError(fetchError);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No course participated!</div>;
  }

  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {data.map((course, index) => (
        <div
          key={index}
          className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        >
          <a href="#">
            <img
              src="/course.jpg"
              alt={course.name}
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                {course.level}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {course.name}
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  ${course.price}
                </p>
                <div className="ml-auto">{/* left elements */}</div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </section>
  );
}

export default MyCourse;
