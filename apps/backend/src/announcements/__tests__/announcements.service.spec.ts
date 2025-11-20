import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Announcement } from '../announcement.model';
import { AnnouncementsGateway } from '../announcements.gateway';
import {
  ANNOUNCEMENTS_REPOSITORY,
  AnnouncementsRepository,
} from '../announcements.repository';
import { AnnouncementsService } from '../announcements.service';

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;
  let repo: jest.Mocked<AnnouncementsRepository>;
  let gateway: { emitAnnouncementCreated: jest.Mock };

  beforeEach(async () => {
    gateway = { emitAnnouncementCreated: jest.fn() };
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByCategories: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnouncementsService,
        { provide: AnnouncementsGateway, useValue: gateway },
        { provide: ANNOUNCEMENTS_REPOSITORY, useValue: repo },
      ],
    }).compile();

    service = module.get<AnnouncementsService>(AnnouncementsService);
  });

  const baseAnnouncement = (): Announcement => ({
    id: 'a1',
    title: 'Hello',
    content: 'World',
    category: ['general'],
    publicationDate: new Date('2025-10-10T00:00:00.000Z'),
    updatedAt: new Date('2025-10-10T00:00:00.000Z'),
  });

  it('create should persist via repo and emit gateway event', async () => {
    const created = baseAnnouncement();
    repo.create.mockResolvedValue(created);

    const result = await service.create({
      title: created.title,
      content: created.content,
      category: created.category,
      publicationDate: created.publicationDate,
    });

    expect(repo.create).toHaveBeenCalledTimes(1);
    expect(gateway.emitAnnouncementCreated).toHaveBeenCalledWith({
      ...created,
    });
    expect(result).toEqual(created);
  });

  it('findAll should return list from repo', async () => {
    const items = [baseAnnouncement()];
    repo.findAll.mockResolvedValue(items);
    await expect(service.findAll()).resolves.toEqual(items);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it('findOne should return the item when exists', async () => {
    const item = baseAnnouncement();
    repo.findOne.mockResolvedValue(item);
    await expect(service.findOne(item.id)).resolves.toEqual(item);
    expect(repo.findOne).toHaveBeenCalledWith(item.id);
  });

  it('findOne should throw NotFound when repo returns null', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('findByCategories should delegate to repo', async () => {
    const items = [baseAnnouncement()];
    repo.findByCategories.mockResolvedValue(items);
    await expect(service.findByCategories(['general'])).resolves.toEqual(items);
    expect(repo.findByCategories).toHaveBeenCalledWith(['general']);
  });

  it('update should return updated item when exists', async () => {
    const updated = { ...baseAnnouncement(), title: 'New' };
    repo.update.mockResolvedValue(updated);
    await expect(
      service.update({ id: updated.id, title: 'New' }),
    ).resolves.toEqual(updated);
    expect(repo.update).toHaveBeenCalledWith({ id: updated.id, title: 'New' });
  });

  it('update should throw NotFound when repo returns null', async () => {
    repo.update.mockResolvedValue(null);
    await expect(
      service.update({ id: 'x', title: 't' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove should throw NotFound when item not found', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.remove('nope')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(repo.remove).not.toHaveBeenCalled();
  });

  it('remove should return true when item exists and is removed', async () => {
    const item = baseAnnouncement();
    repo.findOne.mockResolvedValue(item);
    repo.remove.mockResolvedValue(true);
    await expect(service.remove(item.id)).resolves.toBe(true);
    expect(repo.remove).toHaveBeenCalledWith(item.id);
  });
});
