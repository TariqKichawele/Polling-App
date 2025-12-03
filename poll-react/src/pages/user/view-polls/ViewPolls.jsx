import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { deletePoll, getAllPolls } from "../../../services/poll/poll";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  IconButton,
  Popover,
  MenuItem,
} from "@mui/material";
import { MoreVert as MoreVertIcon, RemoveRedEye as RemoveRedEyeIcon, DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import moment from "moment";
import { blue } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import { Backdrop } from "@mui/material";
import { voteOnPoll } from "../../../services/poll/poll";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


const ViewPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllPolls();
      if (response.status === 200) {
        setPolls(response.data);
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
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(
    async (pollId) => {
      setLoading(true);
      try {
        const response = await deletePoll(pollId);
        if (response.status === 200) {
          enqueueSnackbar("Poll deleted successfully", {
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
    },
    [enqueueSnackbar, fetchData]
  );

  const handlePopoverOpen = (event, poll) => {
    setAnchorEl(event.currentTarget);
    setSelectedPoll(poll);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const handleVote = async (pollId, optionId) => {
    setLoading(true);
    try {
        const obj = {
            pollId: pollId,
            optionId: optionId,
        }
        const response = await voteOnPoll(obj);
        if (response.status === 200) {
            enqueueSnackbar('Vote successful', { variant: 'success', autoHideDuration: 3000 });
            await fetchData();
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const errorMessage = error.response.data?.message || 'Unauthorized';
            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 3000 });
        } else {
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 3000 });
        }
    } finally {
        setLoading(false);
    }
}

  return (
    <>
      <Box sx={{ flexGrow: 1, px: { xs: 2, sm: 3, md: 0 } }}>
        <Grid container spacing={3} direction={"column"} alignItems={"center"}>
          {polls.length === 0 && !loading ? (
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
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No polls found
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/poll/create")}
              >
                Create a Poll
              </Button>
            </Box>
          ) : (
            polls.map((poll) => (
              <Grid
                item
                xs={12}
                sm={8}
                key={poll.id}
                sx={{ width: { xs: '100%', sm: 450 }, maxWidth: "100%" }}
              >
                <Card sx={{ width: '100%', maxWidth: 450, mt: 3, mx: 'auto' }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {poll.username.charAt(0)}
                      </Avatar>
                    }
                    title={poll.username}
                    subheader={moment(poll.postedDate).fromNow()}
                    action={
                      <>
                        <IconButton
                          aria-label="settings"
                          onClick={(event) => handlePopoverOpen(event, poll)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Popover
                          sx={{ width: '10%' }}
                          open={open && selectedPoll === poll}
                          anchorEl={anchorEl}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                        >
                          <Box>
                            <MenuItem onClick={() => navigate(`/poll/${poll.id}/view`)}>
                              <RemoveRedEyeIcon />
                            </MenuItem>
                            <MenuItem onClick={() => handleDelete(poll.id)} disabled={loading} sx={{ color: 'red' }}>
                              <DeleteOutlineIcon />
                            </MenuItem>
                          </Box>
                        </Popover>
                      </>
                    }
                  />

                  <CardContent sx={{ mb: 0, pt: 0 }}>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/poll/${poll.id}/view`)}
                    >
                      <strong>{poll.question}</strong>
                    </Typography>
                    {poll.voted || poll.isExpired
                      ? poll.optionsDTO.map((option) => (
                          <React.Fragment key={option.id}>
                            <div
                              style={{ position: "relative", width: "100%" }}
                            >
                              <LinearProgress
                                variant="determinate"
                                value={
                                  isNaN(
                                    (option.voteCount / poll.totalVoteCount) *
                                      100
                                  )
                                    ? 0
                                    : (option.voteCount / poll.totalVoteCount) *
                                      100
                                }
                                sx={{ height: 30, bgcolor: "#CCD7DF", mt: 1 }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: 0,
                                  width: "100%",
                                  transform: "translateY(-50%)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                  paddingLeft: "10px",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {option.title} +{" "}
                                  {isNaN(
                                    (option.voteCount / poll.totalVoteCount) *
                                      100
                                  )
                                    ? "0%"
                                    : (option.voteCount / poll.totalVoteCount) *
                                      100}
                                  %
                                </Typography>
                                {option.userVotedThisOption && (
                                  <CheckCircleOutlineIcon
                                    sx={{ marginLeft: "4px", fontSize: "20px" }}
                                  />
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ))
                      : poll.optionsDTO.map((option) => (
                          <Paper
                            key={option.id}
                            sx={{ p: 1, width: "95%", mt: 1 }}
                            elevation={3}
                            onClick={() => handleVote(poll.id, option.id)}
                          >
                            {option.title}
                          </Paper>
                        ))}
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{ 
                      justifyContent: "center", 
                      textAlign: "center",
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 0.5, sm: 0 }
                    }}
                  >
                    {poll.isExpired ? (
                      <Typography variant="body2" color="text.secondary">
                        <strong>{poll.totalVoteCount}</strong> votes
                      </Typography>
                    ) : (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Vote: <strong>{poll.totalVoteCount}</strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: { xs: 0, sm: 2 } }}
                        >
                          Expires At:{" "}
                          <strong>
                            {moment(poll.expiredAt).format(
                              "HH:mm on MMMM D, YYYY"
                            )}
                          </strong>
                        </Typography>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
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

export default ViewPolls;
