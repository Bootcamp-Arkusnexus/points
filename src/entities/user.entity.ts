import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// Entidad de usuarios
@Entity()
export class User {
  @PrimaryGeneratedColumn() // ID autoincremental
  id: number;

  @Column() // Nombre del usuario
  name: string;

  @Column({ unique: true }) // Correo electrónico único
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true }) // Foto de perfil opcional
  profilePicture?: string;

  @Column({ nullable: true }) // Imagen de portada opcional
  coverImage?: string;

  @Column({ default: 0 }) // Puntos acumulados del usuario
  totalPoints: number;

  @Column({ default: 1 }) // Nivel del usuario
  level: number;

  @Column({ length: 50, default: "User" }) // Rol del usuario
  role: string;

  @CreateDateColumn() // Fecha de creación automática
  createdAt: Date;

  @UpdateDateColumn() // Fecha de actualización automática
  updatedAt: Date;
}