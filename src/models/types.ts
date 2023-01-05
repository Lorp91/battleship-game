// Board setup
export interface Field {
  id: string;
  x: number;
  y: number;
  status: Status;
}
// "" - wasser "x" - wasserschuss "o" - schiff "!" - getroffenes schiff
export type Status = "" | "x" | "o" | "!";
export type Row = [
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field,
  Field
];
export type Board = [Row, Row, Row, Row, Row, Row, Row, Row, Row, Row];
