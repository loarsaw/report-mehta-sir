"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReportCard = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  console.log(search);
  const [student, set_data] = useState({
    uid: "",
    name: "",
    marks: {
      test1: 0,
      test2: 0,
      test3: 0,
      test4: 0,
      finalExam: 0,
    },
    attendance: 0,
    fatherName: "",
    mobileNo: "",
    class: "",
    graduationYear: 0,
  });
  useEffect(() => {
    get_data();
  }, [search]);

  async function get_data() {
    axios
      .post("https://api.quickcourse.xyz/get_data", {
        uid: search,
      })
      .then((data) => {
        console.log(data.data);
        set_data(data.data);
      });
  }
  const get_pdf = async () => {
    try {
      const response = await axios.get("https://api.quickcourse.xyz/report", {
        responseType: "blob", // Important
      });

      // Create a blob link to download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link: any = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reportCard.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading report card:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <div className="max-w-lg rounded-lg text-black overflow-hidden shadow-xl bg-white p-8 m-4">
        <div className="flex flex-col justify-between mb-6">
          <div className="text-center mb-4">
            <div className="font-bold text-2xl mb-2">{student.name}</div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="mr-8">
              <p className="text-gray-700 text-base mb-2">
                <strong>UID:</strong> {student.uid}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <strong>Class:</strong> {student.class}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Graduation Year:</strong> {student.graduationYear}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-base mb-2">
                <strong>Father Name:</strong> {student.fatherName}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <strong>Mobile No:</strong> {student.mobileNo}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Attendance:</strong> {student.attendance}%
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4 text-center">Marks</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 border-r">Test 1</th>
                <th className="py-3 px-4 border-r">Test 2</th>
                <th className="py-3 px-4 border-r">Test 3</th>
                <th className="py-3 px-4 border-r">Test 4</th>
                <th className="py-3 px-4">Final Exam</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-b">
                <td className="py-3 px-4 border-r">{student.marks.test1}</td>
                <td className="py-3 px-4 border-r">{student.marks.test2}</td>
                <td className="py-3 px-4 border-r">{student.marks.test3}</td>
                <td className="py-3 px-4 border-r">{student.marks.test4}</td>
                <td className="py-3 px-4">{student.marks.finalExam}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex w-full items-center mt-4 text-white justify-center">
            <button onClick={get_pdf} className="bg-red-500 p-3 rounded-full">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
