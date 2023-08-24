import { Entity, Column, Index, OneToMany, BeforeInsert } from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcryt from "bcryptjs";

@Entity("users")
export class User {
  @Index()
  @IsEmail(undefined, { message: "Wrong Email Address" })
  @Length(1, 255, { message: "Empty Email Address" })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "ID is supposed to be more than 3 Characters" })
  @Column({ unique: true })
  username: string;

  @Column()
  @Length(6, 255, { message: "PW is supposed to be more than 6 Characters" })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryt.hash(this.password, 6);
  }
}
