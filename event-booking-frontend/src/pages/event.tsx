import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useEvent from "../Services/event";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const getAuthState = () => {
    const auth_state = localStorage.getItem("_auth_state");
    let data = null;

    if (auth_state) {
      data = JSON.parse(auth_state);
    }
    return data;
  };
  const { id } = useParams();

  const { getOneEvent, getAllComment, postComment } = useEvent();

  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState("");

  const handleClick = () => {
    const obj = {
      id: id,
      email: getAuthState().email,
      content: newComment,
    };
    PostCommentMutation.mutate(obj);
  };

  const { data: event, isEventLoading } = useQuery({
    queryKey: [id],
    queryFn: getOneEvent,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: comments, isLoading } = useQuery({
    queryKey: [id],
    queryFn: getAllComment,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  console.log(isLoading ? "loading" : comments.comments);

  const PostCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      console.log(data);
      if (id) {
        queryClient.invalidateQueries({ queryKey: [id] });
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {event?.banner_url && (
        <img
          src={event.banner_url}
          alt="Event Banner"
          className="w-full h-64 object-cover mb-4"
        />
      )}

      <h1 className="text-2xl font-bold mb-2">{event?.title}</h1>
      <p className="text-gray-600 mb-4">{event?.description}</p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <div className="space-y-4">
          {comments?.comments?.map((comment: any) => (
            <div key={comment.id} className="border p-2 rounded-md">
              <div className="flex justify-between">
                <span className="font-bold">{comment.user.name}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border p-2 rounded-md mb-4"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default EventPage;
