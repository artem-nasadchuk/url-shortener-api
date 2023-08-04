import { FC, useEffect, useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import axios from 'axios';
import { ShortUrl } from './types/ShortUrl';

const apiUrl = 'http://localhost:3000/short-urls';

export const App: FC = () => {
  const [longUrl, setLongUrl] = useState<string>('');
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [message, setMessage] = useState<string>('');

  const fetchShortUrls = async () => {
    try {
      const response = await axios.get(apiUrl);
      setShortUrls(response.data);
    } catch (error) {
      console.error('Error loading short URLs:', error);
    }
  };

  useEffect(() => {
    fetchShortUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(apiUrl, {
        longUrl,
      });
      setLongUrl('');
      setMessage('Short URL created successfully!');
    } catch (error) {
      console.error('Error creating short URL:', error);
      setMessage('Error, Short URL already exists');
    } finally {
      fetchShortUrls();
    }
  };

  const handleRedirect = (shortCode: string) => {
    const shortUrl = `${apiUrl}/${shortCode}`;

    window.location.href = shortUrl;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      {message && (
        <Typography
          color={message.includes('Error') ? 'red' : 'green'}
          sx={{ marginBottom: 2 }}
        >
          {message}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Long URL"
            fullWidth
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              setMessage('');
            }}
            sx={{ flexGrow: 1, mr: 2 }}
          />
          <Button variant="contained" type="submit">
            Shorten
          </Button>
        </Box>
      </form>
      {shortUrls.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Long URL</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Short URL</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shortUrls.map((shortUrl) => (
                <TableRow key={shortUrl.id}>
                  <TableCell>
                    <a href={shortUrl.longUrl}>{shortUrl.longUrl}</a>
                  </TableCell>
                  <TableCell align="right">
                    <a
                      href={shortUrl.shortCode}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRedirect(shortUrl.shortCode);
                      }}
                    >
                      {shortUrl.shortCode}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
