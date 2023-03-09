import {
  getRecently,
  getHighestRating,
  getRecommendations,
} from "../../api/api";
import { useState, useEffect } from "react";
import Recently from "../../components/Recently";
import HighestRating from "../../components/HighestRating";
import Recommendation from "../../components/Recommendation";
import Spinner from "../../components/Spinner";

const Dashboard = ({ token }) => {
  const [recently, setRecently] = useState({});
  const [highest, setHighest] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const [responseRecently, responseHighest, responseRecommendations] =
        await Promise.all([
          getRecently(token),
          getHighestRating(token),
          getRecommendations(token),
        ]);

      if (responseRecently.success) {
        setRecently(responseRecently.data);
      }

      if (responseHighest.success) {
        setHighest(responseHighest.data);
      }

      if (responseRecommendations.success) {
        setRecommendation(responseRecommendations.data);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getData();
  }, []);

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl text-white font-bold mb-6">
          Agregados recientemente
        </h1>
        {loading ? (
          <div className="container h-96">
            <div className="flex h-full justify-center items-center">
              <Spinner />
            </div>
          </div>
        ) : (
          <Recently recently={recently} />
        )}
      </div>
      <div className="mb-10">
        <h1 className="text-4xl text-white font-bold mb-6">
          Animes con mejor calificación
        </h1>
        {loading ? (
          <div className="container h-96">
            <div className="flex h-full justify-center items-center">
              <Spinner />
            </div>
          </div>
        ) : (
          <HighestRating highest={highest} />
        )}
      </div>
      <div className="mb-10">
        <h1 className="text-4xl text-white font-bold mb-6">Recomendaciones</h1>
        {loading ? (
          <div className="container h-96">
            <div className="flex h-full justify-center items-center">
              <Spinner />
            </div>
          </div>
        ) : (
          <Recommendation recommendation={recommendation} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
