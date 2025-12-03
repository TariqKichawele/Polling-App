import React from "react";
import { useSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";
import {
  voteOnPoll,
  getPollDetails,
  likePoll,
  commentOnPoll,
} from "../../../services/poll/poll";
import { useParams } from "react-router-dom";
import {
  Typography,
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Paper,
  Grid,
  Backdrop,
  CircularProgress,
  Divider,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ViewPollDetails = () => {
  const [loading, setLoading] = useState(false);
  const [pollDetails, setPollDetails] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id: pollId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPollDetails(pollId);
      if (response.status === 200) {
        setPollDetails(response.data.pollDTO);
        setLikesCount(response.data.likesCount);
        setCommentsCount(response.data.commentsCount);
        setComments(response.data.commentDTOs);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data?.message || "Unauthorized";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      } else {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, pollId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVote = async (pollId, optionId) => {
    setLoading(true);
    try {
      const obj = {
        pollId: pollId,
        optionId: optionId,
      };
      const response = await voteOnPoll(obj);
      if (response.status === 200) {
        enqueueSnackbar("Vote successful", {
          variant: "success",
          autoHideDuration: 3000,
        });
        await fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data?.message || "Unauthorized";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      } else {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (pollId) => {
    setLoading(true);
    try {
      const response = await likePoll(pollId);
      if (response.status === 200) {
        enqueueSnackbar("Like successful", {
          variant: "success",
          autoHideDuration: 3000,
        });
        await fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data?.message || "Unauthorized";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      } else {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (pollId) => {
    setLoading(true);
    try {
      const obj = {
        pollId: pollId,
        content: newComment,
      };
      const response = await commentOnPoll(obj);
      if (response.status === 200) {
        enqueueSnackbar("Comment successful", {
          variant: "success",
          autoHideDuration: 3000,
        });
        await fetchData();
        setComments([...comments, response.data]);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data?.message || "Unauthorized";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      } else {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, px: { xs: 2, sm: 3, md: 0 } }}>
        <Grid container spacing={3} direction={"column"} alignItems={"center"}>
          {pollDetails === null && !loading ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" sx={{ fontSize: "3rem" }}>
                😩😩😩
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Oops! This poll does not exist.
              </Typography>
            </Box>
          ) : (
            pollDetails && (
              <Grid
                item
                xs={12}
                sm={8}
                key={pollDetails.id}
                sx={{ width: { xs: '100%', sm: 450 }, maxWidth: "100%" }}
              >
                <Card sx={{ width: '100%', maxWidth: 450, mt: 3, mx: 'auto' }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {pollDetails.username.charAt(0)}
                      </Avatar>
                    }
                    title={pollDetails.username}
                    subheader={moment(pollDetails.postedDate).fromNow()}
                  />
                  <CardContent sx={{ mb: 0, pt: 0 }}>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/poll/${pollDetails.id}/view`)}
                    >
                      <strong>{pollDetails.question}</strong>
                    </Typography>
                    {pollDetails.voted || pollDetails.isExpired ? (
                      pollDetails.optionsDTO.map((option) => (
                        <React.Fragment key={option.id}>
                          <div style={{ position: 'relative', width: '100%' }}>
                            <LinearProgress 
                              variant="determinate"
                              value={isNaN((option.voteCount / pollDetails.totalVoteCount) * 100) ? 0 : (option.voteCount / pollDetails.totalVoteCount) * 100}
                              sx={{ height: 30, bgcolor: '#CCD7DF', mt: 1 }}
                            />
                            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}>
                              <Typography variant="body2" color="text.secondary">
                                {option.title} + {isNaN((option.voteCount / pollDetails.totalVoteCount) * 100) ? "0%" : (option.voteCount / pollDetails.totalVoteCount) * 100}%
                              </Typography>
                              {option.userVotedThisOption && (
                                <CheckCircleOutlineIcon sx={{ marginLeft: '4px', fontSize: '20px' }}/>
                              )}
                            </div>
                          </div>
                        </React.Fragment>
                      ))
                    ) : (
                      pollDetails.optionsDTO.map((option) => (
                        <Paper 
                          key={option.id} 
                          sx={{ p: 1, width: "95%", mt: 1 }}
                          elevation={3}
                          onClick={() => handleVote(pollDetails.id, option.id)}
                        >
                          {option.title}
                        </Paper>
                      ))
                    )}
                  </CardContent>
                  <CardActions 
                    disableSpacing 
                    sx={{ 
                      justifyContent: 'center', 
                      textAlign: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 0.5, sm: 0 }
                    }}
                  >
                    {pollDetails.isExpired ? (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{pollDetails.totalVoteCount}</strong> votes 
                      </Typography>
                    ) : (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Vote: <strong>{pollDetails.totalVoteCount}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: { xs: 0, sm: 2 } }}>
                          Expires At: <strong>{moment(pollDetails.expiredAt).format("HH:mm on MMMM D, YYYY")}</strong>
                        </Typography>
                      </>
                    )}
                  </CardActions>

                  <Divider />
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{ p: 1.5 }}
                  >
                    <Grid item sx={{ cursor: "pointer" }}>
                      <Grid container direction="row" alignItems="center">
                        
                        {pollDetails.liked ? (
                          <FavoriteIcon sx={{ color: "red" }} />
                        ) : (
                          <FavoriteBorderIcon
                            onClick={() => handleLike(pollDetails.id)}
                          />
                        )}
                        <Typography sx={{ ml: 1 }}>
                          {likesCount} {likesCount === 1 ? "Like" : "Likes"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ cursor: "pointer" }}>
                      <Grid container direction="row" alignItems="center">
                        <CommentIcon sx={{ color: blue[500] }} />
                        <Typography sx={{ ml: 1 }}>
                          {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
                <Box mt={3} sx={{ width: '100%' }}>
                  <Card sx={{ width: '100%', maxWidth: 450, mx: 'auto' }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        Comments
                      </Typography>
                      <Box sx={{ maxHeight: "200px", overflowY: "auto", p: 1 }}>
                        {comments.map((comment, index) => (
                          <>
                            <Divider />
                            <Typography
                              key={index}
                              variant="body1"
                              gutterBottom
                              sx={{ mb: -2, pt: 2 }}
                            >
                              <strong>{comment.content}</strong>
                            </Typography>
                            <p>
                              posted {moment(comment.createdAt).fromNow()} by{" "}
                              <strong>{comment.username}</strong>
                            </p>
                            <Divider />
                          </>
                        ))}
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Add a comment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleComment(pollDetails.id);
                              setNewComment("");
                            }
                          }}
                        />
                      </Box>
                      <Box mt={2} textAlign={"right"}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={
                            !newComment.trim() || newComment.trim() === ""
                          }
                          onClick={() => handleComment(pollDetails.id)}
                        >
                          Post Comment
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
};

export default ViewPollDetails;
