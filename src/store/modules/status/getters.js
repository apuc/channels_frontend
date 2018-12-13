export default {
    status: state => {
        return {
            status: state.status,
            connections: state.connections
        }
    },
};
