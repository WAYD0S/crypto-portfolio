import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const CoinItem = ({ coin }) => {
  const { user } = UserAuth();
  const [savedCoin, setSavedCoin] = useState(false);

  // Path to the user's document in Firestore
  const coinPath = doc(db, "users", `${user?.email}`);

  // Check if the coin is already saved by the user on component mount
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (user?.email) {
        try {
          const userDoc = await getDoc(coinPath);
          const watchList = userDoc.data()?.watchList || [];
          const isSaved = watchList.some(
            (savedCoin) => savedCoin.id === coin.id
          );
          setSavedCoin(isSaved);
        } catch (error) {
          console.error("Error getting user document:", error);
        }
      }
    };

    checkSavedStatus();
  }, [user, coin.id, coinPath]);

  const saveCoin = async () => {
    if (user?.email) {
      // Toggle the saved status
      const newSavedStatus = !savedCoin;

      // Update the UI immediately
      setSavedCoin(newSavedStatus);

      // Update Firestore
      const updateData = {
        watchList: newSavedStatus
          ? arrayUnion({
              id: coin.id,
              name: coin.name,
              image: coin.image,
              rank: coin.market_cap_rank,
              symbol: coin.symbol,
            })
          : arrayRemove({
              id: coin.id,
              name: coin.name,
              image: coin.image,
              rank: coin.market_cap_rank,
              symbol: coin.symbol,
            }),
      };

      await updateDoc(coinPath, updateData);
    } else {
      alert("Please sign in to save or unsave a coin from your watch list");
    }
  };

  return (
    <tr className="h-[80px] border-b overflow-hidden ">
      <td onClick={saveCoin}>
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center transform hover:scale-105 rounded transition-transform duration-300">
            <img
              className="w-6 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="w-[180px] hidden md:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
