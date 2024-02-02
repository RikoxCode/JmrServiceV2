import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { IArchiveItem } from '../../../shared/core/interfaces/IArchiveItem.interface';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../shared/core/helper.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [ToastrService, HelperService],
})
export class TableComponent {
  // Beispiel:
  modal_item:{ [key: string]: any } = {};

  modal_item_id: string = '';

  @Input() items: IArchiveItem[] = [];

  isIllegalKeyWord: string[] = ['id', 'created_at', 'updated_at'];

  filteredItems: any[] = [];
  searchText: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  isSearchBarDisabled: boolean = false;

  constructor(
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.filteredItems = [...this.items];
    this.sort('id');
  }

  /**
   * This function searches for the given string in the items array.
   * 
   * @param searchStr 
   */
  search(searchStr: string): void {
    this.filteredItems = this.items.filter((item) => {
      for (const key in item) {
        if (item.hasOwnProperty(key) && !this.isIllegalKeyWord.includes(key)) {
          const element = item[key as keyof IArchiveItem]; // Add type assertion to access the property using string key
          if (element.toString().toLocaleUpperCase().includes(searchStr.toLocaleUpperCase())) {
            return true;
          }
        }
      }
      return false;
    });
  }

  sort(column: string): void {
    this.filteredItems.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (this.sortOrder === 'asc') {
        return this.compareValues(valueA, valueB);
      } else {
        return this.compareValues(valueB, valueA);
      }
    });

    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  private compareValues(valueA: any, valueB: any): number {
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    } else {
      return String(valueA).localeCompare(String(valueB));
    }
  }

  checkInputs(event: any) {
    this.search(event.target.value);
  }

  clearInput(): void {
    const input = document.getElementsByTagName("input")[0];
    input.value = "";
  }
}
