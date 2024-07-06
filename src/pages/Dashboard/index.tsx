import {
  AttachMoney,
  Badge,
  Build,
  MoneyOff,
  Person,
  Widgets,
} from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import { Form } from "../../components/Form";
import { DashboardFormData, dashboardFormSchema } from "./schemas";

export function DashboardPage() {
  const form = useForm<DashboardFormData>({
    resolver: zodResolver(dashboardFormSchema),
    defaultValues: {
      accountsDate: dayjs(new Date()),
    },
  });

  return (
    <Form form={form}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Clientes
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  32
                </Typography>

                <Person sx={{ width: 64, height: 64 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Produtos
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  10
                </Typography>

                <Widgets sx={{ width: 64, height: 64 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Serviços
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  5
                </Typography>

                <Build sx={{ width: 64, height: 64 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Usuários
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  3
                </Typography>

                <Badge sx={{ width: 64, height: 64 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Contas a Pagar
                </Typography>

                <Form.DateTimePicker
                  name="accountsDate"
                  views={["month", "year"]}
                  size="small"
                  format="MM/YYYY"
                  sx={{ width: 140 }}
                  disabledInput
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  color="error.light"
                  sx={{ fontWeight: "bold" }}
                >
                  R$ 1.000,00
                </Typography>

                <MoneyOff color="error" sx={{ width: 64, height: 64 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Contas a Receber
                </Typography>

                <Form.DateTimePicker
                  name="accountsDate"
                  views={["month", "year"]}
                  size="small"
                  format="MM/YYYY"
                  sx={{ width: 140 }}
                  disabledInput
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  color="success.light"
                  sx={{ fontWeight: "bold" }}
                >
                  R$ 5.000,00
                </Typography>

                <AttachMoney color="success" sx={{ width: 64, height: 64 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
