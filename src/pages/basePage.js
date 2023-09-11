import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/baseLayout'
import { Box } from '@mui/system'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import NotificationService from '../services/norificationService';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import jwt from 'jwt-decode';

export default function BasePage({ children }) {

  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);


  useEffect(() => {
    const socket = new SockJS(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/ws");
    const client = Stomp.over(socket);

    NotificationService.getNotificationsByReceiverId(localStorage.getItem("token") ? jwt(localStorage.getItem("token")).id : 1, setNotifications)

    client.connect({}, () => {
      console.log("Stomp client is connected");

      client.subscribe('/topic/reqCreated', onNotificationReceived);
      client.subscribe('/topic/reqAccepted', onNotificationReceived);
      client.subscribe('/topic/reqDeclined', onNotificationReceived);
      client.subscribe('/topic/resCanceled', onNotificationReceived);

    },
      onError);

    setStompClient(client);
    return () => {
      client.disconnect();
    };

  }, [])

  useEffect(() => {
    console.log("Notificaitons", notifications)
  }, [notifications])

  
  const onNotificationReceived = (payload) => {
    console.log("%%%%%%%%%%%% Usli u callback")
    let receivedNotification = JSON.parse(payload.body);
    setNotifications((prevNotifications) => [...prevNotifications, receivedNotification]);
  }

  const onError = (err) => {
    console.log(err)
  }

  return (
    <div>
      <BaseLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {children}
          <Box sx={{ border: '1px solid coral' }}>
            <Typography variant="h4" sx={{color: "coral"}}>Notifications</Typography>
          {notifications && notifications.length > 0 && notifications.map((n, index) => {
            console.log(n);
            return (
              <Card key={index} sx={{maxWidth: 200, border: '1px solid coral'}}>
                <CardContent>
                  <Typography><i>Notification</i></Typography>
                  <Divider/>
                  <Typography><b>Status: {n.status}</b></Typography>
                  <Typography>{n.message}</Typography>
                </CardContent>
              </Card>
            )
          }
          )}
          {notifications && notifications.length === 0 && 
            <Card>
              <CardContent>
                <Typography><i>Empty</i></Typography>
              </CardContent>
            </Card>
            }
          </Box>
        </Box>

      </BaseLayout>
    </div>
  )
}
