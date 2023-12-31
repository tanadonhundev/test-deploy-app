import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";

import {
  createShortUrl,
  listUrl,
  clicksUrl,
  removeUrl,
} from "../../services/shorturl";
import { useNavigate } from "react-router-dom";

import HeaderBar from "../layouts/headerbar";

export default function ShorturlPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFullUrl, setSelectedFullUrl] = useState(null);

  const navigate = useNavigate();

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      navigate("/shorturl");
      loadData();
    } else {
      navigate("/");
    }
  }, []);

  const loadData = async () => {
    listUrl()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const schema = yup.object().shape({
    fullurl: yup
      .string()
      .required("ป้อนข้อมูล URL ด้วย")
      .url("รูปแบบ URL ไม่ถูกต้อง"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    createShortUrl(data)
      .then((res) => {
        if (res.data === "มี URL ในระบบแล้ว") {
          toast.error(res.data);
        } else {
          toast.success(res.data);
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleShortUrlClick = async (item) => {
    clicksUrl(item)
      .then((res) => {})
      .catch((error) => console.log(error));
  };
  const handleRemove = async (data) => {
    await removeUrl(data);
    await loadData();
    toast.success("ลบ URL สำเร็จ");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <HeaderBar />
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid>
              <Grid>
                <TextField
                  {...register("fullurl")}
                  error={errors.fullurl ? true : false}
                  helperText={errors.fullurl && errors.fullurl.message}
                  fullWidth
                  label="URL"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Shorten
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Full URL</TableCell>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Clicks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? (
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.fullurl}</TableCell>
                      <TableCell>
                        <a
                          href={item.fullurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            handleShortUrlClick(item);
                          }}
                        >
                          {item.shorturl}
                        </a>
                      </TableCell>
                      <TableCell>{item.clicks}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            setSelectedFullUrl(item.fullurl);
                          }}
                        >
                          QRCode
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRemove(item._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No data available.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid>
              <Grid>
                {selectedFullUrl && (
                  <QRCode value={selectedFullUrl} /> // Display QR code
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </>
  );
}
