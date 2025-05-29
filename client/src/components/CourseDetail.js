

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error(err));
  }, [id]);

  const toggleLessonComplete = (lessonId) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
    // Here you can call API to save progress in backend later
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Lessons</h3>
      <ul>
        {course.lessons.map((lesson, idx) => (
          <li key={lesson._id || idx} style={{ marginBottom: 10 }}>
            <input
              type="checkbox"
              checked={completedLessons.includes(lesson._id)}
              onChange={() => toggleLessonComplete(lesson._id)}
            />
            <strong>{lesson.title}</strong>
            <p>{lesson.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetail;