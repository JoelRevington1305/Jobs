import { useState, useEffect } from "react";
import Form from "./components/Form";
import axios from "axios";
import Jobs from "./components/Jobs";

const App = () => {
  const [modal, setModal] = useState(false);
  const width = 577;
  const height = 564;
  const fontSize = { card: 20, heading: 20, side_heading: 14 };
  const cardWidth = 830;
  const cardHeight = 320;
  const cardWeight = 500;
  const buttonWidth = 118;

  const [jobList, setJobList] = useState([]);
  const [editedJob, setEditedJob] = useState(null);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getJobList = async () => {
    await delay(2000)
    const res = await axios.get(
      "https://6555b88984b36e3a431e30d7.mockapi.io/api/job"
    );
    setJobList(res.data);
  };

  const handleEdit = (id) => {
    const jobToEdit = jobList.find((job) => job.id === id);
    setEditedJob(jobToEdit);
    setModal(true);
  };

  const handleDelete = async(id) => {
    try {
      const res = await axios.delete(`https://6555b88984b36e3a431e30d7.mockapi.io/api/job/${id}`);
      if (res.status === 200) {
        setJobList((prevJobList) => prevJobList.filter((job) => job.id !== id));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  }

  useEffect(() => {
    getJobList();
  }, []);

  return (
    <>
      <div className="h-screen bg-gray-200">
        <div className="flex flex-col p-10 w-full items-center">
          <button
            className="flex px-4 py-2 rounded-md border w-max font-semibold text-xl border-black"
            onClick={() => {
              setEditedJob(null);
              setModal(true)
            }}
          >
            Create Job
          </button>
        </div>
        <div className="flex w-full border border-gray-400"></div>
        <div className="flex bg-[#e6e6e6] py-5">
          <div className="flex flex-row flex-wrap justify-between gap-y-12 w-[90%] m-auto">
            {jobList &&
              jobList.map((job) => (
                <Jobs
                  key={job.id}
                  cardWidth={cardWidth}
                  buttonWidth={buttonWidth}
                  cardHeight={cardHeight}
                  cardWeight={cardWeight}
                  fontSize={fontSize}
                  job={job}
                  onEdit = {() => handleEdit(job.id)}
                  onDelete = {() => handleDelete(job.id)}
                />
              ))}
          </div>
        </div>
      </div>
      <Form
        showModal={modal}
        setShowModal={setModal}
        width={width}
        height={height}
        fontSize={fontSize}
        editedJob={editedJob}
        setJobList={(updatedJobList) => setJobList(updatedJobList)}
      />
    </>
  );
};

export default App;
