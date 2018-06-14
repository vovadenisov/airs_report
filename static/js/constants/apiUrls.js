export const apiUrls = {
    loadPlanes: '/air-schedule/api/v1/plane/list/',
    loadAirports: '/air-schedule/api/v1/airport/list/',
    loadReport: (id, start, end) => `/air-schedule/api/v1/generate_report/${id}/?start_date=${start}&end_date=${end}`,
}
