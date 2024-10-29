import React from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProducerForm from "./components/ProducerForm/ProducerForm";
import ProducerList from "./components/ProducerList/ProducerList";
import Dashboard from "./components/Dashboard/Dashboard";
import CustomThemeProvider, { useThemeContext } from "./context/ThemeContext";

const App: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <CustomThemeProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Brain Agriculture
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" onClick={toggleTheme}>
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProducerForm />
                  <ProducerList />
                </>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Container>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
