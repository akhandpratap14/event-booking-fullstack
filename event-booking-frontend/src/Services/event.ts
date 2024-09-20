import Instance from "./instance";

const useEvent = () => {
  const { instance: api } = Instance();

  const allEvents = async () => {
    const response = await api.get("events");
    return response.data;
  };

  const getOneEvent = async ({ queryKey }) => {
    const id = queryKey[1];
    const response = await api.get(`events/${id}`);
    return response.data;
  };

  const boolRsvp = async (obj: { event_id: any; email: string }) => {
    const response = await api.post("rsvp", obj);
    return response.data;
  };

  const unBoolRsvp = async (obj: { event_id: any; email: string }) => {
    const response = await api.post("un_rsvp", obj);
    return response.data;
  };

  const postComment = async (obj: any) => {
    const res = await api.post("comments", obj);
    return res.data;
  };

  const deleteComment = async (id: any) => {
    const res = await api.post(`comment-delete/${id}`);
    return res.data;
  };

  const getAllComment = async ({ queryKey }) => {
    const id = queryKey[1];
    const res = await api.get(`comments/${id}`);
    return res.data;
  };

  return {
    postComment,
    boolRsvp,
    allEvents,
    getOneEvent,
    getAllComment,
    unBoolRsvp,
    deleteComment,
  };
};

export default useEvent;
