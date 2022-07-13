import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('user')
export class User {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        }
    }

}
