import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/entities/User';

@Entity('car')
export class Car {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url?: string;

  @Column()
  image_description?: string;

  @Column()
  alcohol_consumption: number;

  @Column()
  gas_consumption: number;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }

    if(!this.image_url) {
      this.image_url = '';
    }

    if(!this.image_description) {
      this.image_description = '';
    }
  }

}
