type CarType = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  image_description: string;
  alcohol_consumption: number;
  gas_consumption: number;
  user_id: string;
  created_at: string;
  update_at: string;
};

export type CarDTO = {
  cars: CarType[];
};

export type UniqueCarDTO = {
  car: CarType;
};
