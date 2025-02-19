import { title } from "process";

const Category = {
  Ejercicio: "Ejercicio",
  Trabajo: "Trabajo",
  CuidadoPersonal: "Cuidado Personal",
  Hobbies: "Hobbies",
};

const SubCategory = {
  Caminata: "Caminata",
};

enum Period {
  Diario = "Diario",
  Semanal = "Semanal",
  Mensual = "Mensual",
}

enum TimeRange {
  Mañana = "mañana",
  Tarde = "tarde",
  Noche = "noche",
}

const actividad = {
  category: Category.Ejercicio,
  subcategory: SubCategory.Caminata,
  title: "Caminar 10,000 pasos diarios",
  description:
    "Caminar al menos 10,000 pasos al día para mejorar la salud cardiovascular, mantener un peso saludable y reducir el estrés. La caminata se hará en el parque central para aprovechar el aire fresco y despejar la mente.",
  goal: {
    period: Period.Diario,
    value: 10000,
    unit: "pasos",
  },
  time_range: TimeRange.Mañana,
  time: "07:00",
};

const rutina = {
  title: "rutina1",
  description: "rutina de ejercicios",
  activities: [actividad, {}],
};
