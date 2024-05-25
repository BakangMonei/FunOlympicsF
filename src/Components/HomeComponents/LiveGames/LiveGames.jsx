
import { collection, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, firestore } from "../../../firebase"
import { SearchBar } from "../../General"

import { v4 as uuid} from "uuid"
import "./LiveGames.css"
import { useNavigate } from "react-router-dom"
import { CardboxWrapper } from "../CardboxWrapper"
export const LiveGames = () => {
    const NavigateToPage = useNavigate()
    const [liveVideoData, setLiveVideoData] = useState()
    const QueryDocs = (setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/lives`)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        let vData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
        
    }

    const FilterDocs = async(keywords, documentPath, eventType) => {
        const q = eventType ? query(collection(firestore, documentPath), where("eventType", "==", eventType)) : query(collection(firestore, documentPath))
        // const q = query(collection(firestore, documentPath))
        const snapQuery = await getDocs(q);
        let fireDocuments = []
        let tempData = []
        snapQuery.forEach((doc) => {
            fireDocuments.push(doc.data())
        })
        if(fireDocuments.length > 0) {
            tempData = fireDocuments.filter((doc)=>{
                if (keywords === "") {
                    return []
                } else {
                    return doc.videoTitle.toLowerCase().includes(keywords)
                }
            })
            setLiveVideoData(tempData)
        }
    }

    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/lives", "")
    }

    const HandleCardClick = (videoID) => {
        NavigateToPage(`/live/watch/${videoID}`)
    }



    useEffect(()=>{
        QueryDocs(setLiveVideoData, "none")
    },[])

    return (
        <div className="live-main">
            <div className="live-header">
                <SearchBar placeholder={"Search Live"} handleSearch={HandleSearch}/>
            </div>
            <div className="live-main-wrapper">
                {
                    liveVideoData && liveVideoData.map((vDat, idx) => {
                            return <div className="b-cardbox" key={idx}> 
                                        <CardboxWrapper 
                                            videoTitle={vDat.videoTitle}
                                            eventType={vDat.eventType}
                                            thumbnail={vDat.thumbnail}
                                            category={vDat.category}
                                            channelName={vDat.channelName}
                                            key={vDat.videoID}
                                            videoID={vDat.videoID}
                                            HandleClick={HandleCardClick}
                                            cardType={`Live`}
                                        />
                                    </div>
                        })
                }
            </div>
        </div>
    )
}