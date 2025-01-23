// blacklist.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BlacklistService {
    private blacklistedTokens = new Set<string>();

    constructor(private jwtService: JwtService) {}

    async addToBlacklist(token: string) {
        // 这里可以将token存储到数据库或任何黑名单存储机制中
        // 为了简化，这里我们仅将其存储在内存中的集合
        this.blacklistedTokens.add(token);
    }

    async isTokenBlacklisted(token: string) {
        return this.blacklistedTokens.has(token);
    }
}
