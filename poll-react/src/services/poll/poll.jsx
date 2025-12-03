import axiosInstance from '../../environment/axiosInstance';

export const postPoll = async (pollDTO) => {
    try {
        const response = await axiosInstance.post('/api/user/poll', pollDTO);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const deletePoll = async (pollId) => {
    try {
        const response = await axiosInstance.delete(`/api/user/poll/${pollId}`);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const getAllPolls = async () => {
    try {
        const response = await axiosInstance.get('/api/user/polls');
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const getMyPolls = async () => {
    try {
        const response = await axiosInstance.get('/api/user/my-polls');
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const getPollDetails = async (pollId) => {
    try {
        const response = await axiosInstance.get(`/api/user/poll/details/${pollId}`);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const likePoll = async (pollId) => {
    try {
        const response = await axiosInstance.post(`/api/user/poll/like/${pollId}`);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const unlikePoll = async (pollId) => {
    try {
        const response = await axiosInstance.delete(`/api/user/poll/unlike/${pollId}`);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const commentOnPoll = async (commentDTO) => {
    try {
        const response = await axiosInstance.post('/api/user/poll/comment', commentDTO);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await axiosInstance.delete(`/api/user/poll/comment/${commentId}`);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

export const voteOnPoll = async (voteDTO) => {
    try {
        const response = await axiosInstance.post('/api/user/poll/vote', voteDTO);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}