interface IRobot {
  name: string;
  color: string;
  type: any;
  phrase?: string;
  options: {
    option1: boolean;
    option2: boolean;
    option3: boolean;
  };
  createdDate: number;
}
export default IRobot;
