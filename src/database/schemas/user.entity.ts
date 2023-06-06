import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export type UserProfile = {
    id: number;
    email: string;
    nickname: string;
    interest: number;
    phone: string;
    role: boolean;
    img: string;
};

export type createUserInput = {
    id: number;
    email: string;
    password: string;
    nickname: string;
    interest: number;
    phone: string;
    role: boolean;
    img: string;
};

export type updateUserInput = Partial<Omit<createUserInput, 'user_id'>>;

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email!: string;

    @Column({ type: 'varchar', nullable: false })
    password!: string;

    @Column({ type: 'varchar', nullable: false })
    nickname!: string;

    @Column({ type: 'int', nullable: false })
    interest!: number;

    @Column({ type: 'varchar', nullable: false })
    phone!: string;

    @Column({ type: 'tinyint', nullable: false, width: 1, default: 0 })
    role!: boolean;

    @Column({ type: 'varchar', nullable: true, default: null })
    img!: string;
}