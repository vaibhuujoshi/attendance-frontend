import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ActionAlerts({ message, severity, onClose }) {
  if (!message) return null;

  return (
    <Stack sx={{textAlign:"center", width: "100%", mb: 2 ,borderRadius:"20px"}} spacing={2}>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Stack>
  );
}