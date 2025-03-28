import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from '@prisma/client';
import { isUrl } from 'src/utils/isUrl';
import { removeFile } from 'src/utils/removeFile';
import { BirthdayAwardService } from 'src/birthday_award/birthday_award.service';

@Injectable()
export class UserInfoService {
  constructor(
    private prisma: PrismaService,
    private birthdayAwardService: BirthdayAwardService,
  ) {}

  async getUserInfo(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        birthday: true,
        gender: true,
        profile_img: true,
        miniature_img: true,
        discord: true,
        telegram: true,
        twitch: true,
        vk: true,
      },
    });
  }

  async updateUsername(userId: number, dto: UpdateUsernameDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await this.prisma.pastUsername.create({
      data: {
        username: user.username,
        userId,
      },
    });

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: dto.username,
      },
    });
  }

  async updateBirthday(userId: number, dto: UpdateBirthdayDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        birthday: dto.birthday,
      },
    });
    await this.birthdayAwardService.giveBirthdayAwardToUser(user.id);
    return user;
  }

  async updateGender(userId: number, dto: UpdateGenderDto) {
    switch (dto.gender) {
      case 'MALE':
        return await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            gender: Gender.MALE,
          },
        });
      case 'FEMALE':
        return await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            gender: Gender.FEMALE,
          },
        });
      default:
        throw new BadRequestException('invalid gender');
    }
  }

  async updateProfileImg(userId: number, img: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!!user.profile_img && !isUrl(user.profile_img)) {
      // remove img from static folder if it's not URL
      removeFile(user.profile_img);
    }

    if (!!user.miniature_img && !isUrl(user.miniature_img)) {
      removeFile(user.miniature_img);
    }

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_img: img.filename,
        miniature_img: null,
      },
    });
  }

  async updateMiniatureImg(userId: number, img: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!!user.miniature_img && !isUrl(user.miniature_img)) {
      // remove img from static folder if it's not URL
      removeFile(user.miniature_img);
    }

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        miniature_img: img.filename,
      },
    });
  }
}
