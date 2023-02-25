import { IsEmail, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
} from "typeorm";
import bcryt from "bcryptjs";

@Entity("users")
export class User {
  @Index()
  @IsEmail(undefined, { message: "Wrong Email Format" })
  @Length(1, 255, { message: "Type Email" })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "Type Username longer than 3 characters" })
  @Column()
  username: string;

  @Column()
  @Length(6, 255, { message: "Type Password longer than 6 characters" })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
