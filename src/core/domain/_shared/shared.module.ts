import { Module } from '@nestjs/common';
import { RouteDiscoveryService } from './services/route-discovery.service';

@Module({
    providers: [RouteDiscoveryService],
    exports: [RouteDiscoveryService],
})
export class SharedModule { }
