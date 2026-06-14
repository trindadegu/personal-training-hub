const DIAS = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo"
];
const DIA_LABEL = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo"
};
const DIA_SHORT = {
  segunda: "Seg",
  terca: "Ter",
  quarta: "Qua",
  quinta: "Qui",
  sexta: "Sex",
  sabado: "Sáb",
  domingo: "Dom"
};
function emptyTraining() {
  return DIAS.reduce((acc, d) => {
    acc[d] = { focus: "", exercises: [] };
    return acc;
  }, {});
}
const ADMIN_SESSION_KEY = "atlantida_admin_session";
const STUDENT_SESSION_KEY = "atlantida_student_session";
const THEME_KEY = "atlantida_theme";
export {
  ADMIN_SESSION_KEY as A,
  DIAS as D,
  STUDENT_SESSION_KEY as S,
  THEME_KEY as T,
  DIA_LABEL as a,
  DIA_SHORT as b,
  emptyTraining as e
};
