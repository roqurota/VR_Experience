import { useEffect } from "react"
import { io } from "socket.io-client"
import { useUsersStore, useCheckerStore } from "./Store"

export const socket = io('http://localhost:3001')

export const SocketManager = () => {

    const { users, setUsers } = useUsersStore();
    const { selectedChecker, selectChecker } = useCheckerStore();

    useEffect(() => {
        function onConnect() {
            console.log('connected')
        }

        function onDisconnect() {
            console.log('disconnected')
        }

        function onUsers(value) {
            console.log('users: ', value)
            setUsers(value);
        }

        function onChecker(value) {
            console.log('checker: ', value)
            selectChecker(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('users', onUsers);
        socket.on('checker', onChecker);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('users', onUsers);
            socket.off('checker', onChecker);
        }
    }, []);


}