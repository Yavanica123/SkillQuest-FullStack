import React, { useEffect, useState } from "react";
import "./DashBoard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courseRoutes") // ✅ Ensure backend route matches
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleSelect = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/courseRoutes/${id}/select`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();

    if (res.ok) {
      setCourses((prev) =>
        prev.map((course) =>
          course._id === id ? { ...course, selected: true } : course
        )
      );
      alert(`✅ You have selected "${result.selection.courseTitle}"`);
    } else {
      alert(result.message || 'Error selecting course.');
    }
  } catch (err) {
    console.error("Error selecting course:", err);
  }
};

  return (
    <div className="dashboard container mt-4">
      <h2 className="mb-4 text-center">📚 Featured Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="card-text"><strong>Duration:</strong> {course.duration}</p>
                {course.selected ? (
                  <div className="text-success fw-bold">✅ You have selected this course</div>
                ) : (
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleSelect(course._id)}
                  >
                    Select Course
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
