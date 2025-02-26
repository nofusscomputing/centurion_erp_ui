import { FormatTime } from "./FormatTime";


// afterEach(cleanup);


describe('Months format correctly', () => {


    test('Jan', () => {

        expect(FormatTime({
            time: '2025-01-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Jan 2025');

    });

    test('Feb', () => {

        expect(FormatTime({
            time: '2025-02-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Feb 2025');

    });

    test('Mar', () => {

        expect(FormatTime({
            time: '2025-03-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Mar 2025');

    });

    test('Apr', () => {

        expect(FormatTime({
            time: '2025-04-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Apr 2025');

    });

    test('May', () => {

        expect(FormatTime({
            time: '2025-05-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 May 2025');

    });

    test('Jun', () => {

        expect(FormatTime({
            time: '2025-06-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 June 2025');

    });

    test('Jul', () => {

        expect(FormatTime({
            time: '2025-07-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 July 2025');

    });

    test('Aug', () => {

        expect(FormatTime({
            time: '2025-08-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Aug 2025');

    });

    test('Sep', () => {

        expect(FormatTime({
            time: '2025-09-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Sept 2025');

    });

    test('Oct', () => {

        expect(FormatTime({
            time: '2025-10-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Oct 2025');

    });

    test('Nov', () => {

        expect(FormatTime({
            time: '2025-11-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Nov 2025');

    });

    test('Dec', () => {

        expect(FormatTime({
            time: '2025-12-01T00:00:00Z',
            tz: 'UTC'
        })).toBe('00:00 01 Dec 2025');

    });


});


test('UTC -> Australia/Darwin', () => {

    expect(FormatTime({
        time: '2025-02-27T00:00:00Z',
        tz: 'Australia/Darwin'
    })).toBe('09:30 27 Feb 2025');

});


test('UTC -> Australia/Darwin ISO', () => {

    expect(FormatTime({
        time: '2025-02-27T00:00:00Z',
        iso: true,
        tz: 'Australia/Darwin'
    })).toBe('2025-02-27T00:00:00Z');

});



test('Australia/Darwin -> UTC', () => {

    expect(FormatTime({
        time: '2025-02-27T09:30:00+09:30',
        tz: 'UTC'
    })).toBe('00:00 27 Feb 2025');

});


test('Australia/Darwin -> UTC ISO', () => {

    expect(FormatTime({
        time: '2025-02-27T09:30:00',
        iso: true,
        tz: 'Australia/Darwin'
    })).toBe('2025-02-27T00:00:00Z');

});
