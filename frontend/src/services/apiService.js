import api from "./api";

export const fetchAllData = async (token) => {
    try{
        const [graficDespesa, info] = await Promise.all([
            api.get('/dash', { headers: { Authorization: `Bearer ${token}`} }),
            api.get('/info', { headers: { Authorization: `Bearer ${token}`} })
        ])

        return {
            graficDespesa: graficDespesa.data.documents,
            info: info.data
        }
    }catch(error){
        console.log("Erro ao buscar dados das APIs", error)
    }

}