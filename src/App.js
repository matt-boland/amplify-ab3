/* src/App.js */
import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createVideos } from './graphql/mutations'
import { listVideos } from './graphql/queries'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

function App({ signOut, user }) {
  const [formState, setFormState] = useState(initialState)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchVideos() {
    try {
      const videoData = await API.graphql(graphqlOperation(listVideos))
      const videos = videoData.data.listVideos.items
      setVideos(videos)
    } catch (err) { console.log('error fetching videos') }
  }

  async function addVideo() {
    try {
      if (!formState.name || !formState.description) return
      const video = { ...formState }
      setVideos([...videos, video])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createVideos, {input: video}))
    } catch (err) {
      console.log('error creating video:', err)
    }
  }

  return (
    <>
    <Heading level={1}>Hello <em>{user.username}</em></Heading>
    <Button onClick={signOut}>Sign out</Button>
    
    <div style={styles.container}>
      <h2>Amplify Videos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addVideo}>Create Video</button>
      {
        videos.map((video, index) => (
          <div key={video.id ? video.id : index} style={styles.video}>
            <p style={styles.videoName}>{video.name}</p>
            <p style={styles.videoDescription}>{video.description}</p>
          </div>
        ))
      }
    </div>
    </>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  video: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  videoName: { fontSize: 20, fontWeight: 'bold' },
  videoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);