import { useMutation, useQuery } from "@tanstack/react-query";
import useEvent from "../Services/event";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const Home = () => {
  const { allEvents, boolRsvp, unBoolRsvp } = useEvent();

  const navigate = useNavigate();

  const signOut = useSignOut();

  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");

  const { data: events, isLoading } = useQuery({
    queryKey: ["all_events"],
    queryFn: allEvents,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const eventMutation = useMutation({
    mutationFn: boolRsvp,
    onSuccess: () => {
      toast.success("Booked");
    },
    onError: () => {
      toast.error("Already booked");
    },
  });

  const UneventMutation = useMutation({
    mutationFn: unBoolRsvp,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const getAuthState = () => {
    const auth_state = localStorage.getItem("_auth_state");
    let data = null;

    if (auth_state) {
      data = JSON.parse(auth_state);
    }
    return data;
  };

  const filteredEvents = events?.filter((event) => {
    const matchesTitle = title
      ? event.title.toLowerCase().includes(title.toLowerCase())
      : true;
    const matchesLocation = location
      ? event.location.toLowerCase().includes(location.toLowerCase())
      : true;
    return matchesTitle && matchesLocation;
  });

  return (
    <div className="h-screen w-screen bg-[#f1f5fb] flex">
      {/* Sidebar */}
      <div className="h-screen bg-[#1d2435] w-72 flex flex-col items-center justify-start gap-y-10 py-16">
        <div className="flex gap-x-2 justify-center items-center">
          <img
            src="logo/booking.png"
            alt="logo"
            height={1}
            width={1}
            className="h-10 w-10"
          />
          <div className="text-xl font-bold text-white">
            Event Booking Panel
          </div>
        </div>

        <div
          onClick={() => {
            signOut();
            navigate("/");
          }}
          className="h-12 w-48 cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out text-white rounded-lg bg-[#3b50e0] flex items-center justify-center"
        >
          Log out
        </div>
      </div>

      <div className="flex flex-col w-full h-screen overflow-hidden">
        <div className="w-full h-20 shadow-md flex items-center justify-center text-2xl font-medium">
          {`Welcome back ${getAuthState()?.name || "Guest"}`}
        </div>

        <div className="px-5 py-4 flex gap-x-4">
          <input
            type="text"
            placeholder="Filter by Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Filter by Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="p-4 h-full overflow-y-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredEvents?.map((event: any, index: number) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p>{event.description}</p>
                      <p className="text-gray-500">{event.date}</p>
                      <p className="text-gray-500">{event.location}</p>
                    </div>
                    <div className="flex flex-col gap-y-4">
                      <div
                        onClick={() => {
                          eventMutation.mutate({
                            event_id: event.id,
                            email: getAuthState().email,
                          });
                        }}
                        className="h-10 w-48 cursor-pointer hover:scale-105 duration-200 transition-all ease-in-out text-white rounded-lg bg-[#3b50e0] flex items-center justify-center"
                      >
                        RSVP
                      </div>

                      <div
                        onClick={() => {
                          UneventMutation.mutate({
                            event_id: event.id,
                            email: getAuthState().email,
                          });
                        }}
                        className="h-10 w-48 cursor-pointer hover:scale-105 duration-200 transition-all ease-in-out text-white rounded-lg bg-[#3b50e0] flex items-center justify-center"
                      >
                        Unregister RSVP
                      </div>
                      <div
                        onClick={() => {
                          navigate(`/event/${event.id}`);
                        }}
                        className="h-10 w-48 cursor-pointer hover:scale-105 duration-200 transition-all ease-in-out text-white rounded-lg bg-[#3b50e0] flex items-center justify-center"
                      >
                        View Event
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
