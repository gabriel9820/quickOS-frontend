import { useCallback, useEffect, useState } from "react";
import {
  AttachMoney,
  Badge,
  Build,
  Handyman,
  MoneyOff,
  Person,
  PointOfSale,
  Widgets,
} from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import { Form } from "../../components/Form";
import { DashboardFormData, dashboardFormSchema } from "./schemas";
import {
  DashboardOutputModel,
  DashboardQueryParams,
} from "../../models/dashboard.model";
import { formatDecimal } from "../../utils/format";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDashboardAsync } from "../../services/dashboard.service";
import { UserRole } from "../../enums/user-role.enum";

export function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const form = useForm<DashboardFormData>({
    resolver: zodResolver(dashboardFormSchema),
    defaultValues: {
      accountsDate: dayjs(new Date()),
    },
  });
  const [dashboard, setDashboard] = useState<DashboardOutputModel>();
  const isAdmin = user?.role === UserRole.Admin;
  const accountsDate = form.watch("accountsDate");

  const getDashboard = useCallback(async () => {
    try {
      const formData = form.getValues();
      const params: DashboardQueryParams = {
        accountsDate: formData.accountsDate.format("YYYY-MM"),
      };

      const { data } = await getDashboardAsync(params);
      setDashboard(data);
    } catch (error) {
      handleError(error, dispatch);
    }
  }, [form, dispatch]);

  useEffect(() => {
    getDashboard();
  }, [getDashboard, accountsDate]);

  if (!dashboard) return null;

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
                  {dashboard.countCustomers}
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
                  {dashboard.countProducts}
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
                  {dashboard.countServices}
                </Typography>

                <Handyman sx={{ width: 64, height: 64 }} />
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
                  {dashboard.countUsers}
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
                  Ordens de Serviço
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
                <Stack>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {`Aberto: ${dashboard.countServiceOrders.open}`}
                  </Typography>

                  <Typography sx={{ fontWeight: "bold" }}>
                    {`Em andamento: ${dashboard.countServiceOrders.inProgress}`}
                  </Typography>

                  <Typography sx={{ fontWeight: "bold" }}>
                    {`Finalizado: ${dashboard.countServiceOrders.completed}`}
                  </Typography>
                </Stack>

                <Build sx={{ width: 64, height: 64 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {isAdmin && (
          <>
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
                      Lucro do mês
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
                      color={
                        dashboard.profit >= 0 ? "success.light" : "error.light"
                      }
                      sx={{ fontWeight: "bold" }}
                    >
                      {`R$ ${formatDecimal(dashboard.profit, 2)}`}
                    </Typography>

                    <PointOfSale sx={{ width: 64, height: 64 }} />
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
                      {`R$ ${formatDecimal(dashboard.accountsPayableSum, 2)}`}
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
                      {`R$ ${formatDecimal(
                        dashboard.accountsReceivableSum,
                        2
                      )}`}
                    </Typography>

                    <AttachMoney
                      color="success"
                      sx={{ width: 64, height: 64 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Form>
  );
}
