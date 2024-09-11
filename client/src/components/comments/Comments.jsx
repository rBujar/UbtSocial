import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { makeRequest }  from '../../axios.js'
import moment from "moment"

const Comments = ({postId}) => {

    const [desc, setDesc] = useState("")
    
  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () =>

      makeRequest.get("/comments?postId="+postId).then((res) => {
        return res.data;
      })
    
  })

  const queryClient = useQueryClient()

    const addCommentMutation = useMutation({
        mutationFn:(newComment) =>{
            return makeRequest.post("/comments", newComment)
        },
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
      })
    const deleteCommentMutation = useMutation({
        mutationFn:(commentId) =>{
            return makeRequest.delete(`/comments/${commentId}`)
        },
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments'] })
          
        },

      })
  

    const handleClick = async (e) =>{
        e.preventDefault();
        if(desc !== "") addCommentMutation.mutate({desc, postId});
        setDesc("");

    }

    const {currentUser} = useContext(AuthContext)

    const handleDelete = (commentId) => {
      deleteCommentMutation.mutate(commentId, {
        onError: (error) => {
          console.error("Error deleting comment:", error);
        },
        onSuccess: () => {
          console.log("Comment deleted successfully");
        },
      });
    };

   
    return (
        <div className="comments">
            <div className="write">
                <img src={"/upload/"+currentUser.profilePic} alt="" />
                <input type="text" placeholder="write a comment" 
                value={desc} onChange={e=>setDesc(e.target.value)}/>
                <button onClick={handleClick}>Send</button>
            </div>
            {isPending ? "Pending..." : data.map(comment => (
                <div className="comment" key={comment.id}>
                    <img src={"/upload/"+comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">{moment(comment.createdAt).fromNow()}</span>
               
                      <button onClick={() =>handleDelete(comment.id)}>Delete</button>
                    
                </div>
            ))
            }

        </div>
    )
}

export default Comments